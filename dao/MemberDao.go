package dao

import (
	"fmt"
	"yunke/model"
	"yunke/tool"
	//"github.com/goes/logger"  //这个库网站找不到了
)

type MemberDao struct {
	*tool.Orm
}

//新用户的插入
func (md *MemberDao) InsertMemeber(member model.Member) int64 {
	result, err := md.InsertOne(&member)
	if err != nil {
		fmt.Println(err.Error())
		return  0
	}
	return  result
}

func (md *MemberDao) InsertCode(sms model.SmsCode) int64 {
	result, err := md.InsertOne(&sms)
	if err != nil {
		//logger.Error(err.Error())
	}
	return result
}

func (md *MemberDao) Query(name string, password string) *model.Member {
	var member model.Member
	password = tool.EncoderSha256(password)

	if _, err := md.Where("user_name = ? AND password = ? ", name, password).Get(&member); err != nil {
		fmt.Println(err.Error())
		return nil
	}
	return &member
}

//查询验证码
func (md *MemberDao) ValidateSmsCode(phone string, code string) *model.SmsCode {
	var sms model.SmsCode

	if _, err := md.Where("phone = ? AND code = ?", phone, code).Get(&sms); err != nil {
		fmt.Println(err.Error())
		return nil
	}

	return &sms
}

//查询用户
func (md *MemberDao) QueryByPhone(phone string) *model.Member {
	var member model.Member

	if _, err := md.Where("phone = ?", phone).Get(&member); err != nil {
		fmt.Println(err.Error())
	}
	return  &member
}

//列表
func (md *MemberDao) QueryList(params *model.Member, startRow int, lengthNum int) ([]*model.Member, error) {

	var members []*model.Member

	err := md.Limit(lengthNum, startRow).Find(&members, params)
	if err!= nil {
		return nil, err
	}

	return members, nil
}

//计算总条数
func (md *MemberDao) QueryCount(params *model.Member) int64 {
	var members model.Member

	total, _ := md.Where(members, params).Count(members)
	return  total
}
