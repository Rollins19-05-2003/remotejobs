const cheerio = require('cheerio');
export const parseJobsHtml = (htmlContent) => {
  console.log('Parsing HTML content...');
  
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Cleaning HTML ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const cleanHtml = htmlContent.trim();
  
  // console.log('Cleaned HTML Preview:', cleanHtml.substring(0, 500));
  
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Wrapping the content in a table and proper HTML structure ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const wrappedHtml = `
    <table>
      ${cleanHtml}
    </table>
  `;
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Loading the HTML with different options ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const $ = cheerio.load(wrappedHtml, {
    xmlMode: false,
    decodeEntities: true,
    normalizeWhitespace: false
  });
  
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Debug HTML structure ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  console.log('\nHTML Structure Debug:');
  console.log('- Document length:', $.root().html().length);
  console.log('- First level elements:', $.root().children().length);
  
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Try multiple ways to find elements ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const trElements = $('tr');
  console.log('- TR elements found:', trElements.length);
  
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Finding job elements ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const jobElements = trElements.filter(function() {
    const classAttr = $(this).attr('class');
    return classAttr && classAttr.includes('job');
  });
  console.log('Number of job elements found:', jobElements.length);

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Extracting job data ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const jobs = [];
  
  jobElements.each((index, element) => {  
    const $job = $(element);
    console.log(`\nParsing job ${index + 1}:`);

    try {
      // console.log('Job element HTML:', $.html($job));

      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Extract company logo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      const logoImg = $job.find('td.image.has-logo img.logo.lazyload');
      const logoUrl = logoImg.attr('data-src') || null;
      console.log('- Company Logo URL:', logoUrl);

      const jobId = $job.attr('data-id');
      console.log('- Job ID:', jobId);
      
      const title = $job.find('h2').text().trim();
      console.log('- Title:', title);

      const companyName = $job.find('span.companyLink h3').text().trim();
      console.log('- Company:', companyName);

      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Location and salary with emoji cleanup ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      const locationElements = $job.find('.location');
      const location = $(locationElements[0]).text().replace('', '').trim();
      const salary = $(locationElements[1]).text().replace('💰', '').trim();
      
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Tags for filtering ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      const tags = [];
      $job.find('.tags h3').each((_, tagElement) => {
        tags.push($(tagElement).text().trim());
      });
    
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Links and timestamps ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      const applyLink = $job.find('.source a').attr('href');
      const postedTime = $job.find('time').text().trim();
      const postedDateTime = $job.find('time').attr('datetime');
      
    // Additional metadata
    const jobData = {
      id: jobId,
      title,
      company: companyName,
      companyLogo: logoUrl,
      location,
      salary,
      tags,
      applyLink,
      postedTime,
      postedDateTime,
    };

    jobs.push(jobData);
    } catch (error) {
      console.error('Error parsing job:', error);
    }
  });

  return jobs;
};