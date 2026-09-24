// shared helpers for lesson files (loaded before lessons/*.js and course_data.js)
const LESSON_BANK = {};
const sl = (v, en, ro, hen, hro) => ({v, t:L(en, ro), h:hen ? L(hen, hro) : null});
const tm = (en, ro, den, dro) => [L(en, ro), L(den, dro)];
const qz = (qen, qro, answers, c, wen, wro) => ({q:L(qen, qro), a:answers.map(x => L(x[0], x[1])), c, why:L(wen, wro)});
