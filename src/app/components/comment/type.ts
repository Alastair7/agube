export interface CommentConfig {
    id: number;
    type: CommentType;
}

export interface CommentCreate extends CommentConfig {
    message: string;
    created?: Date;
}

export enum CommentType {
    DWELLING,
    SPRING_SOURCE
}
