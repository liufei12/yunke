package tool

import (
	"encoding/json"
	"io"
)

type JsonParse struct {

}

//这个参数解析只是解析参数的数据类型是否正确，不解析参数是否是必传
func Decode(io io.ReadCloser, v interface{}) error  {
	return  json.NewDecoder(io).Decode(v)
}
