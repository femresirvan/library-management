import prisma from '../config/prisma';
import {
  mapUserEntityToUserResponseDto,
  mapUserEntitiesToUsersResponseDtos,
} from '../mappers/userMapper';
import {
  CreateUserRequestDto,
  UserResponseDto,
  UsersResponseDto,
} from '../dtos';
import { NotFoundException, UserNotFoundException } from '../types';

export const getAllUsers = async (): Promise<UsersResponseDto[]> => {
  const users = await prisma.user.findMany();
  return mapUserEntitiesToUsersResponseDtos(users);
};

export const getUserById = async (
  id: number,
): Promise<UserResponseDto | null> => {
  const user = await prisma.user.findUnique({
    include: { borrowedBooks: { include: { book: true } } },
    where: { id },
  });

  if (!user) {
    throw new NotFoundException();
  }

  return mapUserEntityToUserResponseDto(user);
};

export const createUser = async (dto: CreateUserRequestDto): Promise<void> => {
  await prisma.user.create({
    data: { name: dto.name },
  });
};

export const validateUserExistsOrThrow = async (id: number): Promise<void> => {
  const user = await prisma.user.findFirst({
    where: { id: id },
  });
  if (!user) {
    throw new UserNotFoundException();
  }
};
