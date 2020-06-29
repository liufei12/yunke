package model

type TitleCategory struct {
	//类别Id
	Id	int64	`xorm:"pk autoincr" json:"id"`
	//文章类别标题
	Cname		string	`xorm:"varchar(20)" json:"cname"`
	//文章类别描述
	Decription	string	`xorm:"varchar(30)" json:"decription"`
	//食品种类图片
	ImageUrl	string	`xorm:"varchar(255)" json:"image_url"`
	//食品类别链接
	Status		int8	`xorm:"tinyint(3)" json:"status"`
	//该类别是否存在服务状态
	CreateTime	string	`xorm:"timestamp" json:"create_time"`
}
