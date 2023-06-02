import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  Table,
} from 'typeorm';

export class createEmailsTable1685455960443 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'emails',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'subject',
            type: 'varchar',
          },
          {
            name: 'body',
            type: 'text',
          },
          {
            name: 'senderId',
            type: 'uuid',
          },
          {
            name: 'receiverId',
            type: 'uuid',
          },
          {
            name: 'sentAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'read',
            type: 'boolean',
            default: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'emails',
      new TableForeignKey({
        columnNames: ['senderId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'emails',
      new TableForeignKey({
        columnNames: ['receiverId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('emails');
  }
}
