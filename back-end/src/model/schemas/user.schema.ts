import mongoose from "mongoose";
import { UserRegistration } from "../interfaces/user.interface";
import { NextFunction } from "express";
import bcrypt from 'bcryptjs';

const schema = new mongoose.Schema<UserRegistration>({
    fullName: {
        type: String,
        required: [true, 'Name is required']
    },
    userName: {
        type: String,
        unique: true,
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    image: {
        type: String,
        default: 'data:image/png;base64,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'
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    tasks: {
        type: [String],
        ref: "taskModel"
    },
    createdAt: {
        type: Date,
        default: Date.now,
        select: false
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        select: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

// Pre-save middleware to hash password before saving
schema.pre('save', async function (next: NextFunction) {
    // Proceed only if the password field has been modified (or is new)
    if (!this.isModified('password')) {
        return next();
    }

    // Password encrypting
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Instance method to compare passwords
schema.methods.comparePassword = async function (candidatePassword: string, dbpswrd: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, dbpswrd); // Compare candidate password with stored hash
};

export const UserModel = mongoose.model<UserRegistration>('User', schema);
