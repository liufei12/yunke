package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

type ExciseController struct{

}

type N int

func (n *N) test() {
	fmt.Printf("15行的指针N值 %v \n", *n)  //13
	fmt.Printf("16行N的地址 %v \n", &n)  //13
}

func (e *ExciseController) ExciseOne(ctx *gin.Context) {
	var n N = 10
	p := &n
	fmt.Printf("\nN的地址 %v \n", &n)  //13
	fmt.Printf("\nP的值 %v \n", p)  //13


	n++ //11
	f1 := n.test

	n++ //12
	f2 := p.test

	n++  //13
	fmt.Printf("\n29行N的值 %v \n", n)  //13

	f1()
	f2()

}
