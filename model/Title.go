package model

type Title struct {
	//文章Id
	Id			int64	`xorm:"pk autoincr" json:"id"`
	//文章标题
	Name		string	`xorm:"not null default '' varchar(20)" json:"name"`
	//文章描述
	Content	    string	`xorm:"text" json:"content"`
	//图片
	ImageUrl	string	`xorm:"not null default '' varchar(255)" json:"image_url"`
	//文章类型关联Id
	TypeId        int64	`xorm:"not null default 0 bigint(20)" json:"type_id"`
	//状态
	Status		int8	`xorm:"not null default 1 tinyint(3)" json:"status"`
	//创建时间
	CreateTime	string	`xorm:"not null default CURRENT_TIMESTAMP timestamp" json:"create_time"`
}

type TitleType struct {
	//Title `xorm: "extends"`
	Id			int64	`xorm:"pk autoincr" json:"id"`
	//文章标题
	Name		string	`xorm:"not null default '' varchar(20)" json:"name"`
	//文章描述
	Content	    string	`xorm:"text" json:"content"`
	//图片
	ImageUrl	string	`xorm:"not null default '' varchar(255)" json:"image_url"`
	//文章类型关联Id
	TypeId        int64	`xorm:"not null default 0 bigint(20)" json:"type_id"`
	//状态
	Status		int8	`xorm:"not null default 0 tinyint(3)" json:"status"`
	//创建时间
	CreateTime	string	`xorm:"not null default CURRENT_TIMESTAMP timestamp" json:"create_time"`
	Cname string
}
