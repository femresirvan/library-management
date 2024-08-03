import { describe, expect, it, jest } from '@jest/globals';
import prisma from '../../src/config/prisma';
import {
  UsersResponseDto,
  UserResponseDto,
  CreateUserRequestDto,
} from '../../src/dtos';
import * as userMapper from '../../src/mappers/userMapper';
import {
  getAllUsers,
  getUserById,
  createUser,
  validateUserExistsOrThrow,
} from '../../src/services/userService';
import { NotFoundException, UserNotFoundException } from '../../src/types';

describe('userService', () => {
  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
      ];
      const expectedResponse: UsersResponseDto[] = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
      ];

      jest.spyOn(prisma.user, 'findMany').mockResolvedValue(users);
      jest
        .spyOn(userMapper, 'mapUserEntitiesToUsersResponseDtos')
        .mockResolvedValueOnce(expectedResponse);

      const result = await getAllUsers();

      expect(result).toEqual(expectedResponse);
      expect(prisma.user.findMany).toHaveBeenCalled();
      expect(
        userMapper.mapUserEntitiesToUsersResponseDtos,
      ).toHaveBeenCalledWith(users);
    });
  });

  describe('getUserById', () => {
    it('should return the user with the given id', async () => {
      const user = { id: 1, name: 'John Doe' };
      const expectedResponse: UserResponseDto = {
        id: 1,
        name: 'John Doe',
        books: {
          past: [],
          present: [],
        },
      };

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(user);
      jest
        .spyOn(userMapper, 'mapUserEntityToUserResponseDto')
        .mockResolvedValueOnce(expectedResponse);

      const result = await getUserById(1);

      expect(result).toEqual(expectedResponse);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        include: { borrowedBooks: { include: { book: true } } },
        where: { id: 1 },
      });
      expect(userMapper.mapUserEntityToUserResponseDto).toHaveBeenCalledWith(
        user,
      );
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);

      await expect(getUserById(1)).rejects.toThrow(NotFoundException);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        include: { borrowedBooks: { include: { book: true } } },
        where: { id: 1 },
      });
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const dto: CreateUserRequestDto = { name: 'John Doe' };

      jest
        .spyOn(prisma.user, 'create')
        .mockResolvedValue({ id: 1, name: 'John Doe' });
      await createUser(dto);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: { name: 'John Doe' },
      });
    });
  });

  describe('validateUserExistsOrThrow', () => {
    it('should validate if user exists', async () => {
      jest
        .spyOn(prisma.user, 'findFirst')
        .mockResolvedValue({ id: 1, name: 'John Doe' });

      await validateUserExistsOrThrow(1);

      expect(prisma.user.findFirst).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw UserNotFoundException if user does not exist', async () => {
      jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(null);

      await expect(validateUserExistsOrThrow(1)).rejects.toThrow(
        UserNotFoundException,
      );
      expect(prisma.user.findFirst).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
