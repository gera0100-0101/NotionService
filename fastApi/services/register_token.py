from sqlalchemy.orm import Session
from schemas.user import UserCreate
from auth.hashing import hash_password
from models import User

def register_token(user: UserCreate, db: Session):
    hashed_password = hash_password(user.password)
    db_user = User(name=user.name, email=user.email, password=hashed_password)

    db.add(db_user)
    db.commit()