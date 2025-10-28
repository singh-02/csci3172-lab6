Name: Sidhantdeep Singh
Banner ID: B00883455
Course: CSCI 3172
Activity: L10 RegEx Activity


------------------------------------------------------------
FINAL REGULAR EXPRESSIONS (JS flavor)
------------------------------------------------------------

[First Name]
Regex: ^\p{L}+(?:\s\p{L}+)?$
Flags: iu
Notes: Letters only; optional single space + middle name; case-insensitive; Unicode-friendly with 'u' flag.
Fallback (ASCII): ^[A-Za-z]+(?:\s[A-Za-z]+)?$  flags: i

[Last Name]
Regex: ^\p{L}+(?:[-']\p{L}+)*$
Flags: iu
Notes: Letters with internal apostrophes/hyphens; no leading/trailing punctuation; Unicode-friendly.
Fallback (ASCII): ^[A-Za-z]+(?:[-'][A-Za-z]+)*$  flags: i

[Email]
Regex: ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$
Flags: —
Notes: Traditional format; enforces 2–6 character TLD; pragmatic coverage.

[Password]
Regex: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{12,}$
Flags: —
Notes: ≥12 chars; includes lower, upper, digit, and a non-space special character.

------------------------------------------------------------
TEST CASES USED
(From the uploaded assignment file: L10-RegEx Test Case.txt)
A copy is included in the GitLab 'lecture10' folder.
------------------------------------------------------------

------------------------------------------------------------
PASS/FAIL SUMMARY (Honest results)
(Full details in 'results_pass_fail.txt' in your GitLab folder)
------------------------------------------------------------
[First Name]
Maria	PASS
maria	PASS
maRia	PASS
Maria Gabriella	PASS
maria Gabriella	PASS
Maria gabriella	PASS

[Last Name]
Smith	PASS
smith	PASS
smith-burns	PASS
Smith-Burns	PASS
smith-Burns	PASS
O'Brien	PASS
o'Brien	PASS
O'brien	PASS
o'brien	PASS

[Email]
someone@somewhere.com	PASS
Someone-someone@somewhere.com	PASS
someone.someone@somewhere.com	PASS
Someone-someone@somwewhere.com	PASS
someone@somewhere-somewhere.com	PASS
Someone-someone@somewhere.somewhere.com	PASS
someone.someone@somewhere.co	PASS
Someone-someone@somwewhere.info	PASS
someone.someone@somewhere-somewhere.co	PASS
someone.someone@somewhere-somewhere.info	PASS
Someone-someone@somwewhere.somewhere.co	PASS
Someone-someone@somwewhere.somewhere.inform	PASS

[Password]
aB@3bc_e-uxE	PASS
aB@3bc_ex-U!	PASS
aB@3bc_!5-Ux	PASS
2aB#n!3ha-b4	PASS

------------------------------------------------------------
REFLECTION
------------------------------------------------------------
Using a dedicated regex tool (Regexr) gave immediate visual feedback.
Anchors (^…$) and the password lookaheads were easy to verify.
I chose Unicode-friendly name patterns so international letters are accepted in JS with the 'u' flag.
Email is intentionally pragmatic with a 2–6 character TLD.
For passwords I enforced length >= 12, and required lower, upper, digit, and a non-space special character.
The hardest part was balancing correctness with engine differences; documentation explains those trade-offs.

------------------------------------------------------------
SUBMISSION NOTES
------------------------------------------------------------
• Brightspace: Submit this README file only (as .txt).
• GitLab: Push the entire 'lecture10' folder under 'activities/csci3172/'.
  Include the four regex files, the test case copy, and the results_pass_fail.txt.
