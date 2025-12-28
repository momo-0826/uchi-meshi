from __future__ import annotations
from pydantic import BaseModel

from backend.src.profile.domain.model.avatar_url import AvatarUrl
from backend.src.shared.domain.cuisine_genre import CuisineGenre
from backend.src.shared.domain.user_id import UserId
from backend.src.shared.domain.user_name import UserName

class Profile(BaseModel):
    """プロフィールエンティティ
    ユーザーのプロフィール情報を保持する
    """

    user_id: UserId
    user_name: UserName
    avatar_url: AvatarUrl | None = None
    cuisine_genre: list[CuisineGenre] = []

    model_config = {
        # このオブジェクトを不変にする
        "frozen": True
    }