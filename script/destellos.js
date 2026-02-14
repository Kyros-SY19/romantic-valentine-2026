function sparkleBurst() {
  for (let i = 0; i < 12; i++) {
    const spark = document.createElement("div");
    spark.textContent = "✨";
    spark.style.position = "fixed";
    spark.style.left =
      envelope.getBoundingClientRect().left +
      Math.random() * envelope.offsetWidth +
      "px";
    spark.style.top =
      envelope.getBoundingClientRect().top +
      Math.random() * envelope.offsetHeight +
      "px";
    spark.style.fontSize = Math.random() * 12 + 12 + "px";
    spark.style.opacity = "1";
    spark.style.pointerEvents = "none";
    spark.style.transition = "transform 0.8s ease, opacity 0.8s ease";
    spark.style.zIndex = "20";

    document.body.appendChild(spark);

    requestAnimationFrame(() => {
      spark.style.transform = `translate(${(Math.random() - 0.5) * 80}px, ${-60 - Math.random() * 40}px)`;
      spark.style.opacity = "0";
    });

    setTimeout(() => spark.remove(), 900);
  }
}
