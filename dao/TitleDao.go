package dao

import (
	"fmt"
	"yunke/model"
	"yunke/tool"
)

type TitleDao struct {
	*tool.Orm
}

type TitleTypeDao struct{
	*tool.Orm
}

func NewTitle() *TitleDao{
	return &TitleDao{tool.DbEngine}
}

func NewTitleType() *TitleTypeDao {
	return &TitleTypeDao{tool.DbEngine}
}

func (t *TitleDao) List(params *model.Title) ([]*model.Title, error){
	var title []*model.Title

	if err := t.Find(&title, params); err != nil {
		fmt.Println(err)
		return nil, err
	}
	return  title, nil
}

func (td *TitleDao) Create(params model.Title) int64 {

	result, err := td.InsertOne(params);

	if err != nil {
		fmt.Println(err)
		return 0
	}

	return result

}

func (td *TitleDao) QueryByCondition(params *model.Title) *model.TitleType {

	var titleType model.TitleType
	id := params.Id
	if _, err := td.Table("title").Where("title.id = ? ", id).Join("LEFT", "title_category", "title.type_id=title_category.id").Get(&titleType); err != nil {
		fmt.Println(err)
		return nil
	}

	return &titleType
}

//删除
func (td *TitleDao) DeleteById(id int64) bool {

	updateData := map[string]interface{}{
		"status": "-1",
	}
	if _, err := td.Table("title").Where("id = ?", id).Update(updateData); err != nil{
		return false
	}
	return true
}