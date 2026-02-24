import Vibrant from 'node-vibrant'

async function extractColors(spriteUrl) {
    const palette = await Vibrant.from(spriteUrl).getPalette()
    return {
        color1Hex:palette.Vibrant?.hex ?? '#CCCCCC',
        color1Rgb:palette.Vibrant?.rgb ?? [204, 204, 204],
        color2Hex:palette.DarkVibrant?.hex ?? '#CCCCCC',
        color2Rgb:palette.DarkVibrant?.rgb ?? [204, 204, 204],
        color3Hex:palette.Muted?.hex ?? '#CCCCCC',
        color3Rgb:palette.Muted?.rgb ?? [204, 204, 204],
        color4Hex:palette.LightMuted?.hex ?? '#CCCCCC',
        color4Rgb:palette.LightMuted?.rgb ?? [204, 204, 204]
    }
}

export default extractColors;