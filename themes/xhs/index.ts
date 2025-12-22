/**
 * 小红书主题模板汇总
 * 每个主题独立文件，便于维护和扩展
 */

// 基础样式导出
export * from './base';

// 主题模板导出
export { xiaohongshuTemplate } from './xiaohongshu';
export { vintageTemplate } from './vintage';
export { cinemaTemplate } from './cinema';
export { candyTemplate } from './candy';
export { zenTemplate } from './zen';
export { memoTemplate } from './memo';
export { craftTemplate } from './craft';
export { magicTemplate } from './magic';
export { techMinimalTemplate } from './techMinimal';
export { colorfulTemplate } from './colorful';
export { pixelTemplate } from './pixel';
export { textureTemplate } from './texture';
export { dynamicTemplate } from './dynamic';
export { cardTemplate } from './card';
export { storyTemplate } from './story';
export { letterTemplate } from './letter';
export { gridTemplate } from './grid';
export { chinaTemplate } from './china';
export { noteTemplate } from './note';
export { techTemplate } from './tech';

// 主题列表
import { XHSTemplate } from '../../types';
import { xiaohongshuTemplate } from './xiaohongshu';
import { vintageTemplate } from './vintage';
import { cinemaTemplate } from './cinema';
import { candyTemplate } from './candy';
import { zenTemplate } from './zen';
import { memoTemplate } from './memo';
import { craftTemplate } from './craft';
import { magicTemplate } from './magic';
import { techMinimalTemplate } from './techMinimal';
import { colorfulTemplate } from './colorful';
import { pixelTemplate } from './pixel';
import { textureTemplate } from './texture';
import { dynamicTemplate } from './dynamic';
import { cardTemplate } from './card';
import { storyTemplate } from './story';
import { letterTemplate } from './letter';
import { gridTemplate } from './grid';
import { chinaTemplate } from './china';
import { noteTemplate } from './note';
import { techTemplate } from './tech';

export const XHS_TEMPLATES: XHSTemplate[] = [
  xiaohongshuTemplate,  // 活力红薯
  cinemaTemplate,       // 电影字幕
  candyTemplate,        // 糖果渐变
  zenTemplate,          // 禅意茶白
  memoTemplate,         // 备忘录
  magicTemplate,        // 神奇物语
  vintageTemplate,      // 复古报刊
  craftTemplate,        // 纸纹背景
  colorfulTemplate,     // 彩页随笔
  storyTemplate,        // 人文叙事
  letterTemplate,       // 一页信笺
  noteTemplate,         // 撕拉便签
  chinaTemplate,        // 东方美学
  gridTemplate,         // 简单格子
  textureTemplate,      // 现代纹理
  cardTemplate,         // 酷炫卡片
  dynamicTemplate,      // 跃动黑底
  techMinimalTemplate,  // 科技简约
  pixelTemplate,        // 流光像素
  techTemplate,         // 科技先锋
];

export const DEFAULT_XHS_TEMPLATE = XHS_TEMPLATES[0];

export const getXHSTemplateById = (id: string): XHSTemplate | undefined => {
  return XHS_TEMPLATES.find(t => t.id === id);
};

export const getXHSTemplatesByCategory = (category: string): XHSTemplate[] => {
  return XHS_TEMPLATES.filter(t => t.category === category);
};
