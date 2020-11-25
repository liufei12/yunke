/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : yunke

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2020-06-29 19:46:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for food_catagory
-- ----------------------------
DROP TABLE IF EXISTS `food_catagory`;
CREATE TABLE `food_catagory` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) DEFAULT NULL,
  `decription` varchar(30) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `link_url` varchar(255) DEFAULT NULL,
  `is_in_serving` tinyint(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of food_catagory
-- ----------------------------
INSERT INTO `food_catagory` VALUES ('1', '膨化食品', '膨化食品有益健康', 'www.baidu.com', null, '1');
INSERT INTO `food_catagory` VALUES ('2', '话梅类', '话梅是开胃产品', 'www.sina.com', null, '2');

-- ----------------------------
-- Table structure for member
-- ----------------------------
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(20) NOT NULL DEFAULT '',
  `phone` varchar(11) NOT NULL COMMENT '0',
  `password` varchar(255) NOT NULL DEFAULT '',
  `register_time` timestamp NOT NULL DEFAULT '2001-01-01 01:00:00' ON UPDATE CURRENT_TIMESTAMP COMMENT '注册时间',
  `avatar` varchar(255) DEFAULT '' COMMENT '头像',
  `balance` varchar(50) NOT NULL DEFAULT '' COMMENT '爱好',
  `is_active` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0启用 -1停用',
  `city` varchar(10) NOT NULL DEFAULT '' COMMENT '所在城市',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of member
-- ----------------------------
INSERT INTO `member` VALUES ('1', '朱元璋', '13661014367', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '2020-06-09 19:16:30', '', '篮球', '0', '沧州');
INSERT INTO `member` VALUES ('2', '朱棣', '13876567895', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '2020-06-09 19:16:35', '', '足球', '0', '保定');
INSERT INTO `member` VALUES ('3', '赵真', '13832643531', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '2020-06-09 19:14:40', '', '阅读', '0', '邯郸');
INSERT INTO `member` VALUES ('4', '赵光义', '13526654578', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '2020-06-09 19:15:42', '', '绘画', '0', '石家庄');
INSERT INTO `member` VALUES ('5', '赵佶', '13363565357', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '2020-06-09 19:13:41', '', '美术', '0', '邯郸');
INSERT INTO `member` VALUES ('6', '赵构', '13520097867', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '2020-06-09 19:13:43', '', '军事', '0', '咸阳');
INSERT INTO `member` VALUES ('7', '赵匡胤', '13734234568', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '2020-06-09 19:13:45', '', '体育', '0', '开封');

-- ----------------------------
-- Table structure for sms_code
-- ----------------------------
DROP TABLE IF EXISTS `sms_code`;
CREATE TABLE `sms_code` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `phone` varchar(11) DEFAULT NULL,
  `biz_id` varchar(30) DEFAULT NULL,
  `code` varchar(6) DEFAULT NULL,
  `create_teme` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sms_code
-- ----------------------------
INSERT INTO `sms_code` VALUES ('1', '13661014367', '123', '2256', '1591015434');
INSERT INTO `sms_code` VALUES ('2', '13661014367', '123', '4768', '1591057209');

-- ----------------------------
-- Table structure for title
-- ----------------------------
DROP TABLE IF EXISTS `title`;
CREATE TABLE `title` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL DEFAULT '',
  `content` text,
  `image_url` varchar(255) NOT NULL DEFAULT '',
  `status` tinyint(3) NOT NULL DEFAULT '1' COMMENT '是否删除: 1正常 -1已删除',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type_id` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of title
-- ----------------------------
INSERT INTO `title` VALUES ('1', '解说Redis', '<p>redis是非关系型数据库</p>', '', '1', '2020-06-11 20:06:57', '2');
INSERT INTO `title` VALUES ('2', 'php如何搭建环境', 'linux搭建PHP环境', 'www.baidu.com', '1', '2006-01-03 15:01:02', '1');
INSERT INTO `title` VALUES ('3', 'LNMP环境', 'LNMP环境', '', '1', '2020-06-02 14:06:12', '1');
INSERT INTO `title` VALUES ('4', '我是PHPer', '<p>acccc</p>', '', '1', '2020-06-07 07:06:28', '1');
INSERT INTO `title` VALUES ('5', 'redis和其他语言的区别', '<p>Redis是世界上最好的语言</p>', '', '1', '2020-06-07 07:06:28', '2');
INSERT INTO `title` VALUES ('6', 'php图片', '<p>php图片测试</p><p><img src=\"images?datepath=20200628/&imgname=0731403.png\" title=\"\" alt=\"3.png\"/></p><p><br/></p>', '', '1', '2020-06-07 07:06:28', '1');
INSERT INTO `title` VALUES ('7', '鸟哥Linux', '<p>鸟哥的Linux修改</p><p><img src=\"images?datepath=20200628/&imgname=18160316.png\" title=\"\" alt=\"16.png\"/></p>', '', '1', '2020-06-06 18:06:28', '3');

-- ----------------------------
-- Table structure for title_category
-- ----------------------------
DROP TABLE IF EXISTS `title_category`;
CREATE TABLE `title_category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cname` varchar(20) NOT NULL DEFAULT '' COMMENT '分类标题',
  `decription` varchar(30) NOT NULL DEFAULT '' COMMENT '分类描述',
  `image_url` varchar(255) NOT NULL DEFAULT '' COMMENT '分类图片',
  `status` tinyint(3) NOT NULL DEFAULT '0' COMMENT '分类状态:  0启用 -1禁用',
  `create_time` timestamp NOT NULL DEFAULT '2001-01-01 01:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of title_category
-- ----------------------------
INSERT INTO `title_category` VALUES ('1', 'Php', 'PHP的描述', '', '0', '2020-06-11 07:55:13');
INSERT INTO `title_category` VALUES ('2', 'Redis', 'Redis的描述', '', '0', '2020-06-12 06:10:07');
INSERT INTO `title_category` VALUES ('3', 'Linux', 'Linux描述', '', '0', '2020-06-11 07:27:13');
INSERT INTO `title_category` VALUES ('4', 'Mysql', 'Mysql', '', '0', '2020-06-03 06:10:07');
INSERT INTO `title_category` VALUES ('5', 'Golang', 'Golang的描述', '', '0', '2020-06-11 07:23:37');
