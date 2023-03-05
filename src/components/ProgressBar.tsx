type ProgressBarProps = { percent: number }

export default function ProgressBar({ percent }: ProgressBarProps) {
  return (
    <div className="w-full overflow-hidden rounded-full bg-[#fffffd]">
      <div
        className="h-2 rounded-full bg-[#95aefd] transition-all"
        style={{
          width: percent + '%'
        }}></div>
    </div>
  )
}
