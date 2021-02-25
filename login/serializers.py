from address.serializers import FullAddressSerializer
from django.contrib.auth.models import User
from phone.serializers import PhoneSerializer
from rest_framework.fields import ReadOnlyField, CharField, BooleanField
from rest_framework.serializers import ModelSerializer, Serializer


class UserSerializer(ModelSerializer):
    """
    User ModelSerializer
    """
    id = ReadOnlyField()

    class Meta:
        ref_name = 'User'
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email',)


class UserDetailSerializer(UserSerializer):
    """
    User Detail, phone + address ModelSerializer
    """
    id = ReadOnlyField()
    phones = PhoneSerializer(many=True, read_only=False)
    address = FullAddressSerializer(many=True, read_only=False)

    class Meta:
        ref_name = 'UserDetail'
        model = User
        fields = ('id', 'username', 'first_name',
                  'last_name', 'email', 'phones', 'address',)


class UserCustomDetailSerializer(Serializer):
    """
    User Custom Detail ModelSerializer
    """
    id = ReadOnlyField()
    first_name = CharField(
        max_length=None, min_length=None, allow_blank=False, trim_whitespace=True)
    last_name = CharField(
        max_length=None, min_length=None, allow_blank=False, trim_whitespace=True)
    phone = CharField(
        max_length=None, min_length=None, allow_blank=False, trim_whitespace=True)
    email = CharField(
        max_length=None, min_length=None, allow_blank=False, trim_whitespace=True)
    town = CharField(max_length=None, min_length=None,
                     allow_blank=False, trim_whitespace=True)
    street = CharField(max_length=None, min_length=None,
                       allow_blank=False, trim_whitespace=True)
    number = CharField(max_length=None, min_length=None,
                       allow_blank=False, trim_whitespace=True)
    flat = CharField(max_length=None, min_length=None,
                     allow_blank=False, trim_whitespace=True)
    gate = CharField(max_length=None, min_length=None,
                     allow_blank=False, trim_whitespace=True)

    class Meta:
        ref_name = 'UserDetailCustom'

class UserUpdatePhoneSerializer(Serializer):
    """
    FIXME: Rename to UserPhoneUpdateSerializer
    User update phone
    """
    phone = CharField(
        max_length=None, min_length=None, allow_blank=False, trim_whitespace=True)
    main = BooleanField()

    class Meta:
        ref_name = 'UserPhone'

class UserAddressUpdateSerializer(Serializer):
    """
    User Address ModelSerializer
    """
    id = ReadOnlyField()
    full_address = FullAddressSerializer(many=False, read_only=False)
    main = BooleanField()

    class Meta:
        ref_name = 'UserAddress'