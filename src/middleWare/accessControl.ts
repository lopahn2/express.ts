import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import sqlCon from "../../database/sqlCon";
import dotenv from "dotenv";
dotenv.config();
const conn = sqlCon();

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.decoded = jwt.verify(
      (req.headers.authorization as string).replace(/^Bearer\s/, ""),
      process.env.SECRET as string
    ) as JwtPayload;
    if (req.decoded.allowResult) {
      return res.status(403).json({
        error: "403 Forbidden",
        message: "Authorization 토큰이 아닙니다.",
      });
    }

    const queryResult: any = await conn.execute(
      "SELECT * FROM user_auth_info WHERE id = ?",
      [req.decoded.id]
    );
    const DBSearchResult: any = queryResult[0][0] as any;

    if (DBSearchResult !== null) {
      return next();
    } else {
      throw new Error("TokenExpiredError");
    }
  } catch (err: any) {
    if (err.name == "TokenExpiredError") {
      return res.status(403).json({
        error: "403 Forbidden",
        message: "토큰이 만료됐습니다.",
      });
    }
    console.log(err);
    return res.status(403).json({
      error: "403 Forbidden",
      message: "유효하지 않은 토큰입니다.",
    });
  }
};

export default verifyToken;
