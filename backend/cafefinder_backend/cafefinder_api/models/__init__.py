from sqlalchemy.orm import scoped_session, sessionmaker, declarative_base

DBSession = scoped_session(sessionmaker())
Base = declarative_base()