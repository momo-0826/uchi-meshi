from __future__ import annotations
from enum import Enum

class CuisineGenre(Enum):
    """料理のジャンルを表す値オブジェクト
    ユーザーの得意ジャンルやレシピの該当するジャンルを表す。
    固定値で8種類の値を用意
    """
    
    JAPANESE = "和食"
    WESTERN = "洋食"
    CHINESE = "中華"
    ITALIAN = "イタリアン"
    FRENCH = "フレンチ"
    ETHNIC = "エスニック"
    DESSERT = "デザート/スイーツ"
    OTHER = "その他"

    @classmethod
    def from_string(cls, value: str) -> CuisineGenre:
        """文字列から料理ジャンルクラスを生成する
        Args:
            value: 料理ジャンルの文字列(例:和食、洋食など)
        Returns:
            対応するCuisineGenreのEnum値
        Raises:
            ValueError: 不正な料理ジャンルが指定された場合
        """
        for genre in cls:
            if genre.value == value:
                return genre
        valid_values = cls.all_values()
        raise ValueError(
            f"不正な料理ジャンルです： {value}"
            f"有効な値：{', '.join(valid_values)}"
        )
    
    @classmethod
    def all_values(cls) -> list[str]:
        """料理ジャンルを文字列のリストとして取得する

        Returns:
            料理ジャンルの文字列リスト
        """
        return [genre.value for genre in cls]