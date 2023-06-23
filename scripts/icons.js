function createIconLink(href, src, alt) {
    const link = document.createElement('a');
    link.href = href;
    link.target = '_blank';
  
    const img = document.createElement('img');
    img.style.margin = '10px';
    img.src = src;
    img.alt = alt;
  
    link.appendChild(img);
    return link;
  }
  
  function addIcons(iconArray, containerSelector) {
    const iconsDiv = document.querySelector(containerSelector);
  
    iconArray.forEach(icon => {
      const iconLink = createIconLink(icon.href, icon.src, icon.alt);
      iconsDiv.appendChild(iconLink);
    });
  }


  
  const featuresIcons = [
    {
        href: 'https://en.wikipedia.org/wiki/HTML5',
        src: 'src/images/html.svg',
        alt: 'HTML',
      },
      {
        href: 'https://www.w3schools.com/css/',
        src: 'src/images/css.svg',
        alt: 'CSS'
      },
      {
        href: 'https://getbootstrap.com/docs/3.4/javascript/',
        src: 'src/images/bootstrap.svg',
        alt: 'Bootstrap'
      },
      {
        href: 'https://www.javascript.com/',
        src: 'src/images/javascript.svg',
        alt: 'JavaScript'
      },
      {
        href: 'https://git-scm.com/',
        src: 'src/images/git.svg',
        alt: 'Git'
      },
      {
        href: 'https://sass-lang.com/',
        src: 'src/images/scss.svg',
        alt: 'Sass'
      },
      {
        href: 'https://code.visualstudio.com/',
        src: 'src/images/VScode.png',
        alt: 'VisualStudio Code'
      },
      {
        href: 'https://platform.openai.com/',
        src: 'src/images/OpenAI_logo.png',
        alt: 'OpenAI API'
      }
  ];

  addIcons(featuresIcons, '.icons');



  footerIcons = [
    {
      href: "https://www.linkedin.com/in/ilaria-clg/",
      src: './src/images/linkedin-in.svg',
      alt: 'linkedin profile link icon'
    },
    {
      href: "https://github.com/ilagjo",
      src: './src/images/github.svg',
      alt: 'github profile link icon'
    }
  ]  

  addIcons(footerIcons, '.social');