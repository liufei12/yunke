package model

type Member struct {
	Id			int64	`xorm:"pk autoincr" json:"id"`
	UserName	string	`xorm:"varchar(20)" json:"user_name"`
	Phone      string	`xorm:"varchar(11)" json:"phone"`
	Password	string	`xorm:"varchar(255)" json:"password"`
	RegisterTime string `xorm:"timestamp" json:"register_time"`
	Avatar 		string	`xorm:"varchar(255)" json:"avatar"`
	Balance		string	`xorm:"varchar(50)" json:"balance"`
	IsActive	int8	`xorm:"tinyint" json:"is_active"`
	City 		string	`xorm:"varchar(10)" json:"city"`
}








