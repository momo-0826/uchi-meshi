from __future__ import annotations
from uuid import UUID
from pydantic import BaseModel, field_validator

class UserId(BaseModel):
    """ユーザーIDを表すオブジェクト
    Supabase Authが発行するユーザーの一意識別子。
    UUID形式で値を保持する
    """

    value: UUID

    @field_validator("value", mode="before")
    @classmethod
    def validate_value(cls, v: str | UUID) -> UUID:
        if isinstance(v, UUID):
            return v
        if isinstance(v, str):
            try:
                return UUID(v)
            except ValueError:
                raise ValueError(f"不正なUUID形式です: {v}")
        raise ValueError(f"UUIDは文字列またはUUIDオブジェクトである必要があります")
    
    model_config = {
        # このオブジェクトを不変にする
        "frozen": True
    }