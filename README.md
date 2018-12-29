# Gulp; prepared for weareindi/pillar

- Plug and play Gulp js and sass compiling for the Pillar pattern library framework. (https://github.com/weareindi/pillar)
- Designed with progressive enhancement in mind.
- Prepared for 100% lighthouse audits

---

## Installation
We're assuming you've already created a new Pillar project.   
If not, please visit: https://github.com/weareindi/pillar

### Via Terminal (using wget and tar)
Execute the following one liner from your project root to download and extract the Pillar Gulp starter:   
`wget -qO- https://github.com/weareindi/pillar-gulp/archive/1.0.1.tar.gz | tar -xvz -C .`

### Manually
Download and merge contents of this gulp starter into your Pillar project root.

### Procedure
1. Ensure Gulp is installed globally `npm install -g gulp`
2. Install package dependencies with `npm install`
3. Duplicate the `.env.gulp.example` file and rename to `.gulp.env`. Populate the required fields.
4. Run `php pillar server` in it's own terminal.   
5. Run `gulp` in another terminal.   

_Note: This has been built for Gulp 4. Not worth trying with previous versions._   
_Note: Individual gulp tasks are defined in the `./_gulp` directory_
