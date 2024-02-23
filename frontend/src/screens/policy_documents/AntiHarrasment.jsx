import React from 'react';
import { Link } from 'react-router-dom';
import PolicyFooter from './PolicyFooter';

// import logo from './Taypro.png';
const AntiHarrasment = () => {
  const logo =
    'https://res.cloudinary.com/di0iwc8ql/image/upload/v1693812425/wzdesp1oce9ndc5yipep.png';
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="policy-container py-1">
      <div className=" policy-heading-container">
        <img src={logo} className="policy-logo " alt="" />
        <h3 className="policy-heading">Anti Harrasment Policy</h3>
      </div>

      <section className="policy-section1">
        <h5 className="policy-section1-heading">1] INTRODUCTION</h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            At TAYPRO PRIVATE LIMITED, hereafter referred to as the "Company",
            we believe in a culture of respect, diversity, and inclusivity.
            Every individual has the right to work in a professional environment
            that promotes equal employment opportunities and where abusive and
            derogatory conduct is strictly prohibited.
          </span>
          <span className="second-para px-4">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In
            compliance with The Sexual Harassment of Women at Workplace
            (Prevention, Prohibition, and Redressal) Act, 2013, we establish
            this Anti-Harassment Policy. This policy applies to all employees,
            including full-time, part-time, trainees, interns, and contract
            workers of TAYPRO PRIVATE LIMITED located in Pune, Maharashtra,
            India.
          </span>
        </div>
      </section>

      <section className="policy-section1 my-3">
        <h5 className="policy-section1-heading">2] POLICY STATEMENT</h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            Harassment in any form, including verbal, physical, and sexual
            harassment, will not be tolerated by the Company. We are committed
            to providing a safe, healthy, and congenial work environment that
            enables employees to work without fear of prejudice, gender bias,
            and sexual harassment.
          </span>
        </div>
      </section>

      <section className="policy-section1 my-3">
        <h5 className="policy-section1-heading">3] DEFINITION OF HARASSMENT</h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            Harassment constitutes any unwelcome conduct, whether direct or
            indirect, such as: <br />
            <ul>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Unwelcome sexual advances, requests for sexual favours, and
                other verbal or physical conduct of a sexual nature.
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Offensive comments, jokes, innuendos, and other sexually
                suggestive statements
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Display of sexually explicit or offensive material in the
                workplace.
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Any other unwelcome physical, verbal, or non-verbal conduct of
                sexual nature.
              </li>
            </ul>
          </span>
        </div>
      </section>

      <section className="policy-section1 my-3">
        <h5 className="policy-section1-heading">
          4] RESPONSIBILITIES UNDER THE POLICY
        </h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para">
            <ul>
              <li style={{ listStyleType: 'square' }} className="p-1">
                All employees of the Company have a personal responsibility to
                ensure that their behaviour is not contrary to this policy.
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                All employees are encouraged to reinforce the maintenance of a
                working environment free from sexual harassment.
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Any employee who becomes aware of any incident of sexual
                harassment should promptly report the same to the Complaints
                Committee.
              </li>
            </ul>
          </span>
        </div>
      </section>

      <section className="policy-section1 my-3">
        <h5 className="policy-section1-heading">5] COMPLAINTS COMMITTEE</h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            The Company has instituted a Complaints Committee in accordance with
            The Sexual Harassment of Women at Workplace (Prevention,
            Prohibition, and Redressal) Act, 2013. The Committee is responsible
            for investigating every formal written complaint of sexual
            harassment and for taking appropriate action.
            <br />
            For complaints, you can directly reach us on{' '}
            <b> 8828986608/7738517615</b>&nbsp; or E-mail at{' '}
            <b>founders@taypro.in</b>
          </span>
        </div>
      </section>

      <section className="policy-section1 my-3">
        <h5 className="policy-section1-heading">
          6] PROCEDURE FOR REPORTING HARASSMENT
        </h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            Any employee who feels and is being sexually harassed directly or
            indirectly may submit a complaint of the alleged incident to any
            member of the Complaints Committee in writing with his/her signature
            within ten days of the occurrence of the incident.
          </span>
        </div>
      </section>

      <section className="policy-section1 my-3">
        <h5 className="policy-section1-heading">7] ACTION ON HARASSMENT</h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            The Committee will maintain a fair and unbiased process and will
            complete its investigation within a reasonable timeframe. If it is
            determined that harassment has occurred, the Company will take
            necessary action, which may range from counselling to termination,
            depending on the severity of the incident.
          </span>
        </div>
      </section>

      <section className="policy-section1 my-3">
        <h5 className="policy-section1-heading">8] CONFIDENTIALITY</h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            The Company understands that it is difficult for the victim to come
            forward with a complaint about sexual harassment and recognizes the
            victim's interest in keeping the matter confidential. To protect the
            interests of the victim, the accused person, and others who may
            report incidents of sexual harassment, confidentiality will be
            maintained throughout the investigatory process to the extent
            practicable and appropriate under the circumstances.
          </span>
        </div>
      </section>

      <section className="policy-section1 my-3">
        <h5 className="policy-section1-heading">
          8] PROTECTION AGAINST RETALIATION
        </h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            The Company will ensure that victims and witnesses are not
            victimized or discriminated against while dealing with complaints of
            sexual harassment. Strict disciplinary action will be taken against
            any retaliatory behaviour.
          </span>
        </div>
      </section>

      <section className="policy-section1 my-3 pb-3">
        <h5 className="policy-section1-heading">9] REVIEW OF POLICY</h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            This policy will be reviewed annually. Suggestions for changes in
            the policy, if any, should be forwarded to the Complaints Committee.{' '}
          </span>
        </div>
      </section>
      <hr />

      <PolicyFooter />
    </div>
  );
};

export default AntiHarrasment;
