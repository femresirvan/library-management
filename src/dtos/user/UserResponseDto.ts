export interface BookForUserResponseDto {
  name: string;
  userScore?: number;
}

export interface UserResponseDto {
  id: number;
  name: string;
  books?: {
    past: BookForUserResponseDto[];
    present: BookForUserResponseDto[];
  };
}
