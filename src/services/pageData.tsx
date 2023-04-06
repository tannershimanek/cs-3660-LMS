import Card from 'react-bootstrap/esm/Card';

export const sectionOneTitle = (
  <h1 className="text-dark my-4 py-4">2023 world mountain bike league</h1>
);
export const sectionOneContent = (
  <p>
    The 2023 world mountain bike league is an invitation-only freeride mountain
    bike competition held near Zion National Park in Virgin, Utah, United
    States, just to the north of Gooseberry Mesa. From 2001 till 2004, it was
    held off the Kolob Terrace Road, on the western boundary of Zion National
    Park. The premier big-mountain freeride event showcases the world's top
    riders as they took on some of their biggest challenges yet.
  </p>
);

export const sectionTwoTitle = (
  <h2 className="text-dark my-4 py-4">Watch the top runs of 2022</h2>
);
export const sectionTwoContent = (
  <>
    <div className="row m-3">
      <p>
        This year marked the 16th edition of the legendary freeride mountain
        bike event and Red Bull Rampage 2022 did not disappoint. Canadian Brett
        Rheeder triumphed on a near perfect day in Virgin, Utah, with a run that
        combined technical trick mastery with pure flow. Watch Rheeder's winning
        run in the video player above.
      </p>
    </div>
    <div className="row m-3">
      <iframe
        style={{ maxHeight: "50vh" }}
        width="560"
        height="515"
        src="https://www.youtube.com/embed/EZVy-Wrncyg"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  </>
);

export const sectionThreeTitle = <h2 className="text-dark my-4 py-4">Upcoming events</h2>;
export const sectionThreeContent = <div className="row m-3 d-flex justify-content-center gap-3">
  <div
    className="d-flex align-items-end gap-4  animate-1"
    style={{ maxWidth: 450 }}
  >
    <img
      src="../images/test2.avif"
      alt="..."
      className="img-thumbnail"
      style={{ width: 150 }}
    />
    <div>
      <h5>Innsbruck Austria</h5>
      <p>Saturday, June 4th</p>
    </div>
  </div>
  <div
    className="d-flex align-items-end gap-4 animate-1"
    style={{ maxWidth: 450 }}
  >
    <img
      src="../images/test3.avif"
      alt="..."
      className="img-thumbnail"
      style={{ width: 150 }}
    />
    <div>
      <h5>Czech Republic</h5>
      <p className="d-flex align-items-center gap-3">
        Monday, April 28th <span className="badge bg-warning">going fast</span>
      </p>
    </div>
  </div>
  <div
    className="d-flex align-items-end gap-4 animate-1"
    style={{ maxWidth: 450 }}
  >
    <img
      src="../images/test4.avif"
      alt="..."
      className="img-thumbnail"
      style={{ width: 150 }}
    />
    <div>
      <h5>Moab Utah</h5>
      <p className="d-flex align-items-center gap-3">
        Monday, April 1st <span className="badge bg-danger">sold out</span>
      </p>
    </div>
  </div>
  <div
    className="d-flex align-items-end gap-4 animate-1"
    style={{ maxWidth: 450 }}
  >
    <img
      src="../images/test5.avif"
      alt="..."
      className="img-thumbnail"
      style={{ width: 150 }}
    />
    <div>
      <h5>Wales, UK</h5>
      <p className="d-flex align-items-center gap-3">
        TBD <span className="badge bg-info">new</span>
      </p>
    </div>
  </div>
  <div
    className="d-flex align-items-end gap-4 animate-1"
    style={{ maxWidth: 450 }}
  >
    <img
      src="../images/test6.avif"
      alt="..."
      className="img-thumbnail"
      style={{ width: 150 }}
    />
    <div>
      <h5>Vernal Utah</h5>
      <p className="d-flex align-items-center gap-3">
        Monday, April 1st <span className="badge bg-danger">sold out</span>
      </p>
    </div>
  </div>
  <div
    className="d-flex align-items-end gap-4 animate-1"
    style={{ maxWidth: 450 }}
  >
    <img
      src="../images/test.jpeg"
      alt="..."
      className="img-thumbnail"
      style={{ width: 150 }}
    />
    <div>
      <h5>Whistler Canada</h5>
      <p className="d-flex align-items-center gap-3">Monday, July 2nd</p>
    </div>
  </div>
</div>

export const sectionFourTitle = <h2 className="text-dark my-4 py-4">League leaders</h2>;
export const sectionFourContent = <div className='width: 100% row'>
  <div className="bg-image mt-5 mb-2"></div>
  <p className="p-5">This season is still not over and its a tight race to the finish. Through various rounds and stunning locations, teams battle against eachother to claim the title of the best moutnain bike team in the world. Check out the leage leaders and catch up on the key events of the Mountain Bike World Cup.</p><div className="d-flex justify-content-center gap-3 flex-wrap">
    <Card className={'animate-1'} style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://img.redbull.com/images/c_crop,x_0,y_0,h_2133,w_3200/c_fill,w_1680,h_1100/q_auto,f_auto/redbullcom/2022/6/14/rbfpjgclkryrhuzemumb/aaron-gwin-uci-dh-world-cup-fort-william" />
      <Card.Body>
        <Card.Title>United States</Card.Title>
        <Card.Text>
          98 pts
        </Card.Text>
        <div className={'text-decoration-underline text-danger'}>
            <h2 className={"text-primary opacity-8"}>1st</h2>
          </div>
      </Card.Body>
    </Card>
    <Card className={'animate-1'} style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://img.redbull.com/images/c_crop,x_0,y_0,h_1467,w_2200/c_fill,w_1680,h_1120/q_auto,f_auto/redbullcom/2022/9/3/kbflpycmslaxvixyfejr/loic-bruni-dh-world-cup-val-di-sole" />
      <Card.Body>
        <Card.Title>Canada</Card.Title>
        <Card.Text>
          95 pts
        </Card.Text>
        <div className={'text-decoration-underline text-danger'}>
            <h2 className={"text-primary opacity-8"}>2nd</h2>
          </div>
      </Card.Body>
    </Card>
    <Card className={'animate-1'} style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://img.redbull.com/images/c_crop,x_0,y_0,h_2000,w_3000/c_fill,w_1680,h_1120/q_auto,f_auto/redbullcom/2022/8/7/f9tqlm3mbwyu5z3secmz/vali-holl-mont-sainte-anne-dh-finals-2022" />
      <Card.Body>
        <Card.Title>Austria</Card.Title>
        <Card.Text>
          93 pts
        </Card.Text>
        <div className={'text-decoration-underline text-danger'}>
            <h2 className={"text-primary opacity-8"}>3rd</h2>
          </div>
      </Card.Body>
    </Card></div></div>