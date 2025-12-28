from pydantic import BaseModel, field_validator

class UserName(BaseModel):
    """ユーザー名を表す値オブジェクト
    1～50文字以内で値を持つ
    """
    value: str
    MIN_LENGTH = 1
    MAX_LENGTH = 50

    def __init__(self, value: str):
        self.validate(value)
        self._value = value
    
    @property
    def value(self) -> str:
        return self._value
    
    @field_validator('value')
    @classmethod
    def validate(cls, v: str) -> None:
        if v is None:
            raise ValueError("ユーザー名は必須です")
        
        if not v:
            raise ValueError("ユーザー名は必須です")
        
        if not v.strip():
            raise ValueError("ユーザー名は空白のみにできません")
        
        length = len(v)
        if length < cls.MIN_LENGTH or length > cls.MAX_LENGTH:
            raise ValueError("ユーザー名は1〜50文字で入力してください")
    
    model_config = {
        # このオブジェクトを不変にする
        "frozen": True
    }