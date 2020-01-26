'use static'

import React from 'react'
import {
  PixelRatio,
  Dimensions,
  Platform
} from 'react-native'

const ios = Platform.OS === 'ios'
const { width, height } = Dimensions.get('window')

const uiWidth = 375
const uiHeight = 667
const pixel = 1 / PixelRatio.get()
const screenWidth = width
const screenHeight = height
const pixelRatio = PixelRatio.get()
const fontScale = PixelRatio.getFontScale()
const scale = Math.min(height / 667, width / 375)

class ScreenUtils {
  autoWidth = (value) => {
    return width * value / uiWidth
  }

  autoHeight = (value) => {
    return height * value / uiHeight
  }

  get = (url, successCallback, failCallback) => {
    return fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        successCallback(JSON.parse(responseText));
      }).catch(function (err) {
        failCallback(err);
      });
  }

  setSpText = (number) => {
    number = Math.round((number * scale + 0.5) * pixelRatio / fontScale)
    return number / pixelRatio
  }
}

let screenUtils = new ScreenUtils()

export function autoWidth(value) {
  return screenUtils.autoWidth(value)
}

export function autoHeight(value) {
  return screenUtils.autoHeight(value)
}

