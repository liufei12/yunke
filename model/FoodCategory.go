package model

/**
 * 食品种类
 */
type FoodCatagory struct {
	//类别Id
	Id	int64	`xorm:"pk autoincr" json:"id"`
	//食品类别标题
	Title		string	`xorm:"varchar(20)" json:"title"`
	//食品描述
	Decription	string	`xorm:"varchar(30)" json:"decription"`
	//食品种类图片
	ImageUrl	string	`xorm:"varchar(255)" json:"image_url"`
	//食品类别链接
	LinkUrl		string	`xorm:"varchar(255)" json:"link_url"`
	//该类别是否存在服务状态
	IsInServing	int	`xorm:"int,COLUMN:is_in_serving" json:"is_in_serving"`
}

