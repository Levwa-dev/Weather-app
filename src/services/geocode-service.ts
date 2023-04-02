import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import i18n from '../i18n'

export const geocodeService = {
        async getCoords(address:string) {
            try {
                const response = await geocodeByAddress(address)
                const {lat, lng} = await getLatLng(response[0])
                return {lat: Number(lat.toFixed(2)), lng: Number(lng.toFixed(2))}
            } catch (err) {
                const error = i18n.t('searchError')
                return {error}
            }
        }
}