import { type UserData } from "./DTO/user.dto";
import { db } from "../lib/db"; // Import the db connection
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthService {
    
  public async register(userData: UserData) {
    // Here you would typically handle user registration logic
    const existUser = await db.user.findUnique({
      where: {username: userData.username}
    })
    if(existUser){
      return {
        message: "User Exists",
        success: false
      }
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await db.user.create({
      data: { ...userData, password: hashedPassword }, // Save hashed password
    });
    if(!newUser){
      return {
        message: "Internal Server Error",
        success: false
      }
    }

    return {
        message: "registration successful",
        success: true 
    }
  }

  public async login(username: string, password: string) {
    const user = await db.user.findUnique({
      where: { username }
    });

    if (!user) {
      return {
        message: "User not found",
        success: false
      };
    }

    // Compare the password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        message: "Invalid password",
        success: false
      };
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });

    return {
      message: "Login successful",
      success: true,
      token
    };
  }
}

export default new AuthService(); 
