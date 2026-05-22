from fastapi import HTTPException
from schemas.user import UserLogin
from models import User
from auth.hashing import verify_password
from auth.jwt import create_access_token
from sqlalchemy.orm import Session

def login_token(user: UserLogin, db: Session):
    db_user = (
        db.query(User).filter(User.email == user.email).first()
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="invalid credentials(user has not been found)"
        )
    
    if not verify_password(user.password, db_user.password):
        raise HTTPException(
            status_code=401,
            detail="invalid credentials(wrong password)"
        )
    
    token = create_access_token({"sub": str(db_user.id)})

    return token