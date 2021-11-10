import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateAppointments1636575303747 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'appointments',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              generationStrategy: 'uuid'
            },
            {
              name: 'provider',
              type: 'varchar',
              isNullable: false
            },
            {
              name: 'data',
              type: 'timestamp',
              isNullable: false
            }
          ]
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('appointments');
    }

}
