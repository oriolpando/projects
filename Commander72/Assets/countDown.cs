using System.Collections;
using UnityEngine.UI;
using UnityEngine;
using UnityEngine.SceneManagement;

public class countDown : MonoBehaviour
{

  //  public float timeLeft;
    public Text startText;
    private float time = 1200;

    void Start() {

    //  timeLeft = 20.00f;
    if (startText != null){
      time = 1200;
      startText.text = "20:00:000";
      //InvokeRepeating("UpdateTimer", 0.0f, 0.01667f);
      }
    }

    void Update(){

      if (startText != null){
          time -= Time.deltaTime;
          string minutes = Mathf.Floor(time / 60).ToString("00");
          string seconds = (time % 60).ToString("00");
          string fraction = ((time * 100) % 100).ToString("000");
          startText.text = minutes + ":" + seconds + ":" + fraction;
      }

  }

}
