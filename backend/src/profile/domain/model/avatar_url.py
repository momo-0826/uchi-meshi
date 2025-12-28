from pydantic import BaseModel, HttpUrl

class AvatarUrl(BaseModel):
    """アバター画像のURLを表す値オブジェクト
    
    プロフィール画像のURLを表現する。
    """
    value: HttpUrl
    
    model_config = {
        # このオブジェクトを不変にする
        "frozen": True
    }