import React from "react";
import Header from "./Header";

const Info = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <header className="text-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold">Prime Minister's Scholarship Scheme (PMSS)</h1>
          <p className="text-gray-600">Supporting the education of ex-servicemen's children</p>
        </header>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">1. Introduction</h2>
          <p>
            The <strong>Prime Minister's Scholarship Scheme (PMSS)</strong> is an initiative by the Government of India to
            provide financial assistance to the wards of ex-servicemen and widows of Armed Forces personnel.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">2. Eligibility Criteria</h2>
          <ul className="list-disc ml-6">
            <li>Wards and widows of ex-servicemen from the Army, Navy, and Air Force.</li>
            <li>Minimum 60% marks in the last qualifying exam.</li>
            <li>Applicable for professional degree courses only.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">3. Benefits of PMSS</h2>
          <ul className="list-disc ml-6">
            <li>₹2500 per month for boys (₹30,000 per year).</li>
            <li>₹3000 per month for girls (₹36,000 per year).</li>
            <li>Scholarship provided for up to 5 years.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">4. Application Process</h2>
          <ol className="list-decimal ml-6">
            <li>Visit <a href="https://www.ksb.gov.in" className="text-blue-500">KSB Official Website</a>.</li>
            <li>Register as a new user and fill out the application form.</li>
            <li>Upload necessary documents (Aadhaar, marksheets, service certificate, etc.).</li>
            <li>Submit the form and track application status online.</li>
          </ol>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">5. Important Dates</h2>
          <table className="table-auto w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Event</th>
                <th className="border px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Application Start</td>
                <td className="border px-4 py-2">July - August</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Last Date to Apply</td>
                <td className="border px-4 py-2">October - November</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Scholarship Disbursal</td>
                <td className="border px-4 py-2">February - March</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">6. FAQs</h2>
          <p><strong>Q1: Can I apply if my father served in the Indian Air Force but retired?</strong><br /> ✅ Yes, the PMSS is for wards of both serving and retired defense personnel.</p>
          <p><strong>Q2: Is the scholarship available for diploma courses?</strong><br /> ❌ No, only full-time professional degree courses are eligible.</p>
          <p><strong>Q3: What happens if I fail an exam?</strong><br /> ❌ If you score below 50%, the scholarship may be discontinued.</p>
        </section>

        <footer className="text-center mt-8 border-t pt-4">
          <p>For official details, visit <a href="https://www.ksb.gov.in" className="text-blue-500">ksb.gov.in</a></p>
        </footer>
      </div>
    </>
  );
};

export default Info;
