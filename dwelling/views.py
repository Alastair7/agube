from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from login.models import UserAddress, UserPhone
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.views import APIView
from watermeter.models import WaterMeter
from watermeter.serializers import (WaterMeterDetailSerializer,
                                    WaterMeterMeasurementSerializer,
                                    WaterMeterSerializer)

from dwelling.models import Dwelling
from dwelling.serializers import (DwellingCreateSerializer,
                                  DwellingDetailSerializer,
                                  DwellingOwnerSerializer,
                                  DwellingResidentSerializer)

TAG = 'dwelling'


class DwellingListView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_id="getDwellings",
        responses={200: DwellingDetailSerializer(many=True)},
        tags=[TAG],
    )
    def get(self, request):
        """
        Return a list of all Dwelling Detail.
        """
        # Get Dwelling
        dwelling = Dwelling.objects.all()

        list_of_serialized = []
        for house in dwelling:
            user = house.get_resident().user
            user_address = UserAddress.objects.get(
                user=user, main=True).full_address
            user_phone_number = ''

            try:
                user_phone = UserPhone.objects.get(user=user, main=True)
                if user_phone:
                    user_phone_number = user_phone.phone.phone_number
            except ObjectDoesNotExist:
                pass

            data = {
                'id': house.id,
                'town': user_address.address.town,
                'street': user_address.address.street,
                'number': user_address.number,
                'flat': user_address.flat,
                'gate': user_address.gate,
                'resident_first_name': user.first_name,
                'resident_phone': user_phone_number,
            }
            list_of_serialized.append(
                DwellingDetailSerializer(data, many=False).data)

        return Response(list_of_serialized)


class DwellingCreateView(generics.CreateAPIView):
    queryset = Dwelling.objects.all()
    serializer_class = DwellingCreateSerializer
    permission_classes = [AllowAny]

    @swagger_auto_schema(operation_id="createDwelling", operation_description="create a new Dwelling")
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class DwellingOwnerView(generics.GenericAPIView):
    queryset = Dwelling.objects.all()
    serializer_class = DwellingOwnerSerializer
    permission_classes = [AllowAny]

    @swagger_auto_schema(operation_id="getCurrentOwner")
    def get(self, request, pk):
        """
        Get Current Owner
        """
        try:
            dwelling = Dwelling.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)
        owner = dwelling.get_current_owner()
        return Response(self.get_serializer(owner).data)

    @swagger_auto_schema(operation_id="changeCurrentOwner")
    def put(self, request, pk):
        """
        Create a new user owner and discharge the old owner
        """
        try:
            dwelling = Dwelling.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)
        data = request.data['user']
        dwelling.change_current_owner(
            username=data['username'], first_name=data['first_name'], last_name=data['last_name'], email=data['email'])
        owner = dwelling.get_current_owner()
        return Response(self.get_serializer(owner).data)


class DwellingResidentView(generics.GenericAPIView):
    queryset = Dwelling.objects.all()
    serializer_class = DwellingResidentSerializer
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_id="getCurrentResident",
        responses={200: DwellingResidentSerializer(many=False)}
    )
    def get(self, request, pk):
        """
        Get current Resident
        """
        try:
            dwelling = Dwelling.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)
        resident = dwelling.get_current_resident()
        return Response(self.get_serializer(resident).data)

    @swagger_auto_schema(operation_id="changeCurrentResident")
    def put(self, request, pk):
        """
        Create a new user resident and discharge the old resident
        """
        try:
            dwelling = Dwelling.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)
        data = request.data['user']
        dwelling.change_current_resident(
            username=data['username'], first_name=data['first_name'], last_name=data['last_name'], email=data['email'])
        resident = dwelling.get_current_resident()
        return Response(self.get_serializer(resident).data)


class DwellingWaterMeterView(generics.GenericAPIView):
    queryset = WaterMeter.objects.all()
    serializer_class = WaterMeterSerializer
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_id="getCurrentWaterMeter",
        responses={200: WaterMeterSerializer(many=False)},
    )
    def get(self, request, pk):
        """
        Get current Water Meter
        """
        try:
            dwelling = Dwelling.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)
        water_meter = dwelling.get_current_water_meter()
        return Response(self.get_serializer(water_meter).data)

    @swagger_auto_schema(operation_id="changeCurrentWaterMeter")
    def put(self, request, pk):
        """
        Create a new Water Meter and discharge the old Water Meter
        """
        # get Dwelling
        try:
            dwelling = Dwelling.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)
        # create new Water Meter
        dwelling.change_current_water_meter(request.data['code'])
        new_water_meter = dwelling.get_current_water_meter()
        return Response(self.get_serializer(new_water_meter).data)


class DwellingWaterMeterDetailView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_id="getCurrentWaterMeterDetail",
        responses={200: WaterMeterDetailSerializer(many=False)},
        tags=[TAG],
    )
    def get(self, request, pk):
        """
        Return the current Water Meter with measurements.
        """
        # Get Dwelling
        try:
            dwelling = Dwelling.objects.get(id=pk)
        except ObjectDoesNotExist:
            return Response({'status': 'cannot find dwelling'}, status=HTTP_404_NOT_FOUND)
        water_meter = dwelling.get_current_water_meter()

        list_of_water_meter_serialized = []
        for measurement in water_meter.get_measurements():

            data = {
                'id': measurement.id,
                'measurement': measurement.measurement,
                'date': measurement.date,
            }
            list_of_water_meter_serialized.append(
                WaterMeterMeasurementSerializer(data, many=False).data)

        data = {
            'id': water_meter.id,
            'code': water_meter.code,
            'release_date': water_meter.release_date,
            'discharge_date': water_meter.discharge_date,
            'water_meter': list_of_water_meter_serialized,
        }

        return Response(WaterMeterDetailSerializer(data, many=False).data)
