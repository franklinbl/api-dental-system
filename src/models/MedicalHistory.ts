import { Model } from 'sequelize-typescript';
import { Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Patient } from './Patient';

@Table({
  tableName: 'medical_histories',
  timestamps: true,
})
export class MedicalHistory extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare id: number;

  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare patientId: number;

  @BelongsTo(() => Patient)
  declare patient: Patient;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare isOnTreatment: boolean;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare treatmentDetails: string | null;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare allergicToMedication: boolean;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare medicationAllergyDetails: string | null;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare hasAsthma: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare proneToBleeding: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare heartDiseaseHistory: boolean;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare heartDiseaseDetails: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isIn: [['high', 'low', 'normal']],
    },
  })
  declare bloodPressure: 'high' | 'low' | 'normal';

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare anesthesiaComplications: boolean;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare anesthesiaDetails: string | null;

  // Enfermedades específicas
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare diseasesDiabetes: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare diseasesTuberculosis: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare diseasesVenereal: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare diseasesBleedingDisorder: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare diseasesGastrointestinal: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare diseasesHiv: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'created_at',
  })
  declare readonly createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'updated_at',
  })
  declare readonly updatedAt: Date;
}