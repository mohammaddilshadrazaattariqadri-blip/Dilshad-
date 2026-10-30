import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getGlassThemeStyles,
  filterApps,
  calculateExpression,
  toggleQuickSetting,
  DEFAULT_APPS,
} from './launcherLogic';
import { QuickSettingsState } from '../types/launcher';

test('getGlassThemeStyles produces distinct liquid glass styles for transparent, black, and white', () => {
  const transparentStyle = getGlassThemeStyles('transparent', 'medium', 'vibrant');
  const blackStyle = getGlassThemeStyles('black', 'high', 'liquid');
  const whiteStyle = getGlassThemeStyles('white', 'low', 'subtle');

  // Verify transparent properties
  assert.match(transparentStyle.containerBg, /rgba\(255,\s*255,\s*255/);
  assert.equal(transparentStyle.textColor, '#FFFFFF');
  assert.equal(transparentStyle.backdropBlurClass, 'backdrop-blur-xl');
  assert.equal(transparentStyle.specularOpacity, 0.65);

  // Verify black obsidian properties
  assert.match(blackStyle.containerBg, /rgba\(12,\s*14,\s*20/);
  assert.equal(blackStyle.backdropBlurClass, 'backdrop-blur-2xl');
  assert.equal(blackStyle.specularOpacity, 0.95);

  // Verify white opal properties
  assert.match(whiteStyle.containerBg, /rgba\(255,\s*255,\s*255/);
  assert.equal(whiteStyle.textColor, '#0f172a');
  assert.equal(whiteStyle.backdropBlurClass, 'backdrop-blur-md');
  assert.equal(whiteStyle.specularOpacity, 0.25);
});

test('filterApps correctly filters by category and search keyword', () => {
  // Category filter
  const mediaApps = filterApps(DEFAULT_APPS, '', 'media');
  assert.ok(mediaApps.length > 0);
  assert.ok(mediaApps.every((a) => a.category === 'media'));

  // Search keyword filter
  const searchCalc = filterApps(DEFAULT_APPS, 'calc', 'all');
  assert.equal(searchCalc.length, 1);
  assert.equal(searchCalc[0].name, 'Calculator');

  // Non-matching query
  const empty = filterApps(DEFAULT_APPS, 'nonexistentapp12345', 'all');
  assert.equal(empty.length, 0);
});

test('calculateExpression safely handles valid arithmetic and errors', () => {
  assert.equal(calculateExpression('2 + 2').result, '4');
  assert.equal(calculateExpression('10 × 5').result, '50');
  assert.equal(calculateExpression('100 ÷ 4').result, '25');
  assert.equal(calculateExpression('(10 + 5) * 2').result, '30');

  // Malicious or invalid expression
  assert.equal(calculateExpression('window.alert(1)').error, 'Invalid characters');
  assert.equal(calculateExpression('5 ++ 2').error, 'Malformed expression');
});

test('toggleQuickSetting toggles boolean properties correctly', () => {
  const initialSettings: QuickSettingsState = {
    wifi: true,
    bluetooth: false,
    cellular: true,
    flashlight: false,
    dnd: false,
    autoRotate: true,
    airplaneMode: false,
    brightness: 80,
    volume: 75,
  };

  const updatedWifi = toggleQuickSetting(initialSettings, 'wifi');
  assert.equal(updatedWifi.wifi, false);
  assert.equal(updatedWifi.bluetooth, false);

  const updatedBt = toggleQuickSetting(initialSettings, 'bluetooth');
  assert.equal(updatedBt.bluetooth, true);
  assert.equal(updatedBt.wifi, true);
});
