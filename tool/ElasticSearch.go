package tool

import (
	/*"fmt"
	"gopkg.in/olivere/elastic.v6"
	"context"
	"log"
	"os"
	_ "strconv"
	"time"*/
)


/*type EsClientType struct {
	EsCon *elastic.Client
}
var Timeout="1s" //超时时间
var EsClient EsClientType //连接类型

//var host = conf.GetEnv().EsearchServer  //这个是es服务地址,我的是配置到配置文件中了，测试的时候可以写死 比如 http://127.0.0.1:9200
var host = "http://192.168.33.10:9200"

func  InitEs() *EsClientType {

	elastic.SetSniff(false) //必须 关闭 Sniffing
	//es 配置
	var err error
	//EsClient.EsCon, err = elastic.NewClient(elastic.SetURL(host))
	EsClient.EsCon, err =elastic.NewClient(
		elastic.SetURL(host),
		elastic.SetSniff(false),
		elastic.SetHealthcheckInterval(10*time.Second),
		elastic.SetGzip(true),
		elastic.SetErrorLog(log.New(os.Stderr, "ELASTIC ", log.LstdFlags)),
		elastic.SetInfoLog(log.New(os.Stdout, "", log.LstdFlags)),
	)
	if err != nil {
		panic(err)
	}
	info, code, err := EsClient.EsCon.Ping(host).Do(context.Background())
	if err != nil {
		panic(err)
	}

	fmt.Printf("Elasticsearch returned with code %d and version %s\n", code, info.Version.Number)

	esversion, err := EsClient.EsCon.ElasticsearchVersion(host)
	if err != nil {
		panic(err)
	}

	fmt.Printf("Elasticsearch version %s\n", esversion)
	fmt.Println("conn es succ",EsClient.EsCon)

	return &EsClient
}

func (client *EsClientType) Gets(Params map[string]string) *elastic.GetResult {
	//通过Id查询
	var get1 *elastic.GetResult
	var err error
	if len(Params["id"]) < 0 {
		fmt.Printf("param error")
	}

	get1, err = EsClient.EsCon.Get().Index(Params["index"]).Type(Params["type"]).Id(Params["id"]).Do(context.Background())

	if err != nil {
		panic(err)
	}

	return  get1
}

func (client *EsClientType) GetCourse(){

	//通过Id查询
	var get1 *elastic.GetResult
	var err error

	index := "course"
	ortType := "info"
	id := "1"
	get1, err = EsClient.EsCon.Get().Index(index).Type(ortType).Id(id).Do(context.Background())

	if err != nil {
		panic(err)
	}

	fmt.Println(222222)
	fmt.Println()
	fmt.Println(get1)
}*/
