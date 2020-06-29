package model

type SmsCode struct {
	Id 		int64 `xorm:"pk autoincr" json:"id"`
	Phone	string `xorm:"varchar(11)" json:"phone"`
	BizId	string `xorm:"varchar(30)" json:"biz_id"`
	Code	string	`xorm:"varchar(6)" json:"code"`
	CreateTeme int64 `xorm:"bigint" json:"create_teme"`
}
