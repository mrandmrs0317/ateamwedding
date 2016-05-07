mkdir processed

for %%f in (*.svg) do (
	echo %%~nf
	svgo %%~nf.svg "processed/%%~nf.min.svg"
)