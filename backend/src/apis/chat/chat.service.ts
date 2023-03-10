import { Repository } from 'typeorm';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ERROR } from 'src/commons/messages/message.enum';

import { ChatEntity } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly chatRepository: Repository<ChatEntity>,
  ) {}

  /** 방장 조회 */
  async getHost(
    host: string,
    roomName: string, //
  ) {
    const result = await this.chatRepository.findOne({
      where: { host: host, roomName: roomName },
    });

    return result !== undefined ? result : undefined;
  }

  /** 유저 조회 */
  async getUser(roomName: string) {
    const result = await this.chatRepository
      .createQueryBuilder('c')
      .select('c.users')
      .where('c.roomName = :roomName', { roomName: roomName })
      .getOne();

    if (!result) {
      throw new ConflictException(ERROR.NOT_EXIST_USER);
    }

    return result !== undefined ? result : undefined;
  }

  /** 방 조회 */
  async getRoom(
    roomName: string, //
  ) {
    const result = await this.chatRepository.findOne({
      where: { roomName: roomName },
    });

    if (!result) {
      throw new ConflictException(ERROR.CAN_NOT_FIND_CHAT);
    }

    return result;
  }

  /** 해당 방의 참가자 조회 */
  async getRoomMembers(
    roomName: string, //
    targetUserID: string,
  ) {
    const result = await this.chatRepository.findOne({
      select: ['users'],
      where: { roomName: roomName },
    });

    if (!result) {
      throw new ConflictException(ERROR.CAN_NOT_FIND_CHAT);
    }

    const isParticipant = result.users.includes(targetUserID);

    return isParticipant ? true : false;
  }

  /** 방 생성 시 정보 저장 */
  async saveRoomInfo(
    host: string,
    roomName: string,
    users: string[], //
  ) {
    await this.chatRepository.save({
      host,
      roomName,
      users,
    });
  }

  /** 방 정보 업데이트 */
  async updateRoomInfo(
    users: Array<string>,
    roomName?: string, //
    host?: string,
  ) {
    const room = await this.chatRepository.findOne({
      where: { roomName: roomName },
    });

    if (!room) {
      throw new ConflictException(ERROR.CAN_NOT_FIND_CHAT);
    }

    await this.chatRepository.update(
      { host: room.host, id: room.id, roomName: room.roomName },
      { users: users },
    );
  }
}
