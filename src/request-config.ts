import i18n from "./i18n"

export const defaultParams = {
  city: i18n.t('defaultCity'),
  latitude: 50.45,
  longitude: 30.52,
  hourly: ['temperature_2m', 'apparent_temperature', 'cloudcover', 'relativehumidity_2m', 'windspeed_10m','precipitation_probability', 'winddirection_10m'],
  daily: ['temperature_2m_max', 'precipitation_probability_mean','temperature_2m_min'],
  windspeed_unit: 'ms',
  timezone: 'auto'
} 