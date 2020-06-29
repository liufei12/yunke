package tool

import (
	"github.com/go-xorm/xorm"
	"yunke/model"
	_ "github.com_bak/go-sql-driver/mysql"
)

var DbEngine *Orm

type Orm struct {
	*xorm.Engine
}

func OrmEngine(cfg *Config)(*Orm, error)  {
	database := cfg.Database
	conn := database.User + ":" + database.Password + "@tcp(" + database.Host + ":" + database.Port + ")/" + database.DbName + "?charset=" + database.Charset
	engine, err := xorm.NewEngine(database.Driver, conn)
	if err != nil{
		return nil, err
	}

	engine.ShowSQL(database.ShowSql)  //为true时打印出执行sql，为false时不打印sql

	//创建数据库
	err = engine.Sync2(
		new(model.SmsCode),
		new(model.Member),
		new(model.FoodCatagory),
		new(model.TitleCategory),
		new(model.Title),
	)
	if err != nil{
		return nil, err
	}

	orm := new(Orm)
	orm.Engine = engine
	DbEngine = orm
	return orm, nil
}
