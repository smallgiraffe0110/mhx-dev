"""Rebuild the Foundry reel from original NASA clips; see video credits for URLs.
Usage: python3 scripts/build-foundry-reel.py /path/to/nasa-source-directory
Requires ffmpeg. Downloads stay outside Git; the final silent reel is committed.
"""
from pathlib import Path
import subprocess
import sys

root = Path(__file__).resolve().parents[1]
sources = Path(sys.argv[1])
shots = [
    ('lunar-approach.mp4', 15, 70, 10),
    ('iss.mp4', 110, 14, 2),
    ('earthset.mp4', 850, 140, 20),
    ('iss.mp4', 166, 14, 2),
]
cmd = ['ffmpeg', '-hide_banner', '-loglevel', 'warning', '-y', '-filter_complex_threads', '2']
for name, start, duration, _ in shots:
    cmd += ['-ss', str(start), '-t', str(duration), '-i', str(sources / name)]
filters = []
for i, (_, _, _, speed) in enumerate(shots):
    filters.append(f'[{i}:v]setpts=(PTS-STARTPTS)/{speed},fps=30,scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,setsar=1,format=yuv420p,settb=AVTB,eq=saturation=0:contrast=1.08:brightness=-0.01[v{i}]')
filters += [
    '[v0][v1]xfade=transition=fade:duration=0.65:offset=6.35[x1]',
    '[x1][v2]xfade=transition=fade:duration=0.65:offset=12.7[x2]',
    '[x2][v3]xfade=transition=fade:duration=0.65:offset=19.05[x3]',
    '[x3]fade=t=in:st=0:d=0.7,fade=t=out:st=25.35:d=0.7,format=yuv420p[out]',
]
output = root / 'public/video/foundry-orbit-reel.mp4'
cmd += ['-filter_complex', ';'.join(filters), '-map', '[out]', '-an', '-t', '26.05', '-c:v', 'libx264', '-threads', '4', '-preset', 'fast', '-crf', '22', '-movflags', '+faststart', str(output)]
subprocess.run(cmd, check=True)
subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-ss', '2', '-i', str(output), '-frames:v', '1', '-q:v', '3', str(root / 'public/images/foundry-orbit-reel-poster.jpg')], check=True)
