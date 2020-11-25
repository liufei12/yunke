package tool

import (
	//"context"
	//"google.golang.org/grpc"
	"log"
	"os"
	//"time"
	_ "path/filepath"
	"github.com/gookit/config/v2"
	"github.com/gookit/config/v2/json"
	//"proto/user/info"
	//course "proto/course/info"
)

const (
	defaultName = "world"
)

var cfg *config.Config
var (
	version string
	build   string
)
func GrpcInit() string {
	//ex, err := os.Executable()
	_, err := os.Executable()
	if err != nil {
		panic(err)
	}
	//fmt.Println("version=", version)
	//fmt.Println("build=", build)
	//dir:= filepath.Dir(ex)
	//load config
	cfg = config.New("default")
	cfg.WithOptions(config.ParseEnv)

	// add Decoder and Encoder
	cfg.AddDriver(json.Driver)

	//err = cfg.LoadFiles(dir+"/../etc/config.json")
	err = cfg.LoadFiles("./config/app.json")
	if err != nil {
		panic(err)
	}
	log.Printf("config data: \n %#v\n", config.Data())
	proxyRPC := cfg.String("proxy.rpc", "")
	if proxyRPC == "" {
		panic("proxy_rpc is empty")
	}
	return  proxyRPC
}

//测试用
//func TestGrpc(){
//	//ex, err := os.Executable()
//	_, err := os.Executable()
//	if err != nil {
//		panic(err)
//	}
//	//fmt.Println("version=", version)
//	//fmt.Println("build=", build)
//	//dir:= filepath.Dir(ex)
//	//load config
//	cfg = config.New("default")
//	cfg.WithOptions(config.ParseEnv)
//
//	// add Decoder and Encoder
//	cfg.AddDriver(json.Driver)
//
//	//err = cfg.LoadFiles(dir+"/../etc/config.json")
//	err = cfg.LoadFiles("./etc/app.json")
//	if err != nil {
//		panic(err)
//	}
//	log.Printf("config data: \n %#v\n", config.Data())
//	proxyRPC := cfg.String("proxy.rpc", "")
//	if proxyRPC == "" {
//		panic("proxy_rpc is empty")
//	}
//	// Set up a connection to the server.
//	conn, err := grpc.Dial(proxyRPC, grpc.WithInsecure())
//	if err != nil {
//		log.Fatalf("did not connect: %v", err)
//	}
//	defer conn.Close()
//	c := info.NewInfoClient(conn)
//
//	// Contact the server and print out its response.
//	name := "admin"
//	pwd := "123456"
//	if len(os.Args) > 1 {
//		name = os.Args[1]
//	}
//	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
//	defer cancel()
//	r, err := c.Login(ctx, &info.LoginRequest{Name: name, Password: pwd})
//	if err != nil {
//		log.Printf("could not greet111: %v", err)
//	}
//	log.Printf("返回参数111 Greeting: %v", r.GetInfo())
//
//	courseClient := course.NewInfoClient(conn)
//	var cid int64 = 741
//	courseInfo, err := courseClient.GetCourse(ctx, &course.GetCourseRequest{Cid: cid})
//	//courseInfo, err := courseClient.Login(ctx, &course.LoginRequest{Name: name, Password: pwd})
//	if err != nil{
//		log.Printf("could not greet222: %v", err)
//	}
//	log.Printf("返回参数222 Greeting: %v", courseInfo)
//
//
//	/*d := profile.NewProfileClient(conn)
//	s, err := d.Update(ctx, &profile.UpdateRequest{Name: name})
//	if err != nil {
//		log.Printf("could not greet: %v", err)
//	}
//	log.Printf("Greeting: %s", s.GetMessage())
//
//	t, err := d.Get(ctx, &profile.GetRequest{Name: name})
//	if err != nil {
//		log.Printf("could not greet: %v", err)
//	}
//	log.Printf("Greeting: %s", t.GetMessage())*/
//}
