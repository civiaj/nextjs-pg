import bcrypt from 'bcryptjs'
import { DataTypes, Model } from 'sequelize'
import sequelize from '@/db/connection'
import { TUser } from '@/types/user.types'

class User extends Model<TUser, TUser> {
    declare id: string
    declare email: string
    declare name: string
    declare password: string
    declare role: 'admin' | 'user'
    declare avatar: string | null
    declare createdAt: Date
    declare updatedAt: Date

    static hashPassword(user: User) {
        if (user.changed('password')) {
            const salt = bcrypt.genSaltSync(10)
            const hashedPassword = bcrypt.hashSync(user.password, salt)
            user.password = hashedPassword
        }
    }

    comparePassword(candidate: string) {
        return bcrypt.compareSync(candidate, this.password)
    }
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 20]
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            defaultValue: 'user'
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'User',
        tableName: 'users'
    }
)

User.addHook('beforeCreate', User.hashPassword)
User.addHook('beforeUpdate', User.hashPassword)

export default User
