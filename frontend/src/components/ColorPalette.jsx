const ColorPalette = ({ colors }) => {
    return (
        <div className="col-span-3 flex gap-3 h-16">
            {colors.map((c, i) => (
                <div
                    key={i}
                    className="flex-1 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm cursor-pointer hover:scale-105"
                    style={{ backgroundColor: c.hex }}
                    onClick={() => navigator.clipboard.writeText(c.hex)}
                    title={`rgb(${c.rgb})`}
                >
                    <span className="text-white drop-shadow font-mono text-sm">{c.hex}</span>
                </div>
            ))}
        </div>
    )
}

export default ColorPalette